#!/usr/bin/env node

/**
 * Sync Taxonomy Script
 * 
 * This script syncs the digital concierge services data with the master NTUC taxonomy.
 * It ensures consistency in field naming and validates the data structure.
 * 
 * Usage: node scripts/sync-taxonomy.js [--validate-only]
 */

const fs = require('fs');
const path = require('path');

// File paths
const MASTER_TAXONOMY_PATH = path.join(__dirname, '../../../shared/research/ntuc-services-taxonomy.json');
const SERVICES_DATA_PATH = path.join(__dirname, '../lib/services-data.json');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Transform taxonomy service to digital concierge format
 */
function transformService(taxonomyService, pillarName) {
  // Map taxonomy target_audiences to concierge targetAudience format
  const audienceMapping = {
    'all-workers': ['worker'],
    'all-members': ['member'],
    'pmes': ['worker', 'professional'],
    'freelancers': ['freelancer'],
    'lower-wage-workers': ['worker'],
    'women-family': ['parent', 'worker'],
    'young-workers': ['young', 'worker'],
    'older-workers': ['senior', 'worker'],
    'migrant-workers': ['worker'],
    'job-seekers': ['job_seeker'],
    'employers': ['employer'],
    'retrenched-workers': ['job_seeker'],
    'displaced-workers': ['job_seeker'],
    'career-switchers': ['job_seeker', 'worker'],
    'union-members': ['member'],
    'new-members': ['member'],
    'eligible-members': ['member'],
    'families': ['parent'],
    'volunteers': ['volunteer'],
    'seniors': ['senior', 'retired'],
    'low-income-families': ['parent']
  };

  // Map taxonomy delivery_channels to concierge channels format
  const channelMapping = {
    'physical': 'physical',
    'digital': 'digital',
    'hotline': 'hotline',
    'virtual': 'virtual',
    'online': 'online',
    'physical-stores': 'physical',
    'online-learning': 'online',
    'workshops': 'workshops',
    'community-centres': 'community',
    'training-centres': 'physical',
    'physical-meetings': 'physical',
    'digital-platforms': 'digital',
    'campaigns': 'campaigns',
    'media': 'media',
    'events': 'events',
    'policy': 'policy',
    'advocacy': 'advocacy',
    'online-booking': 'online',
    'digital-signup': 'digital',
    'online-communities': 'online',
    'volunteer-programs': 'community',
    'exhibitions': 'events'
  };

  // Extract unique target audiences
  const targetAudience = new Set();
  if (taxonomyService.target_audiences) {
    taxonomyService.target_audiences.forEach(audience => {
      const mapped = audienceMapping[audience];
      if (mapped) {
        mapped.forEach(a => targetAudience.add(a));
      }
    });
  }

  // Extract unique channels
  const channels = new Set();
  if (taxonomyService.delivery_channels) {
    taxonomyService.delivery_channels.forEach(channel => {
      const mapped = channelMapping[channel];
      if (mapped) {
        channels.add(mapped);
      }
    });
  }

  // Build benefit string
  let benefit = taxonomyService.description;
  if (taxonomyService.max_benefit) {
    benefit = `${taxonomyService.max_benefit} in funding support`;
  } else if (taxonomyService.max_coverage) {
    benefit = `Coverage up to ${taxonomyService.max_coverage}`;
  } else if (taxonomyService.discount_rate) {
    benefit = `${taxonomyService.discount_rate} discount`;
  }

  return {
    id: taxonomyService.id,
    name: taxonomyService.name,
    pillar: pillarName.toLowerCase(),
    description: taxonomyService.description,
    targetAudience: Array.from(targetAudience),
    benefit: benefit,
    channels: Array.from(channels)
  };
}

/**
 * Extract services from master taxonomy
 */
function extractServicesFromTaxonomy(taxonomy) {
  const services = [];
  
  Object.entries(taxonomy.pillars).forEach(([pillarKey, pillar]) => {
    if (pillar.services && Array.isArray(pillar.services)) {
      pillar.services.forEach(service => {
        services.push(transformService(service, pillarKey));
      });
    }
  });

  return services;
}

/**
 * Validate service data structure
 */
function validateService(service, index) {
  const errors = [];
  const warnings = [];

  // Required fields
  const requiredFields = ['id', 'name', 'pillar', 'description', 'targetAudience', 'benefit', 'channels'];
  requiredFields.forEach(field => {
    if (!service[field]) {
      errors.push(`Service ${index + 1} (${service.id || 'unknown'}): Missing required field '${field}'`);
    }
  });

  // Validate pillar values
  const validPillars = ['protection', 'progression', 'placement', 'privileges'];
  if (service.pillar && !validPillars.includes(service.pillar)) {
    errors.push(`Service ${index + 1} (${service.id}): Invalid pillar '${service.pillar}'`);
  }

  // Validate arrays
  if (service.targetAudience && !Array.isArray(service.targetAudience)) {
    errors.push(`Service ${index + 1} (${service.id}): targetAudience must be an array`);
  }
  if (service.channels && !Array.isArray(service.channels)) {
    errors.push(`Service ${index + 1} (${service.id}): channels must be an array`);
  }

  // Warnings for empty arrays
  if (service.targetAudience && service.targetAudience.length === 0) {
    warnings.push(`Service ${index + 1} (${service.id}): Empty targetAudience array`);
  }
  if (service.channels && service.channels.length === 0) {
    warnings.push(`Service ${index + 1} (${service.id}): Empty channels array`);
  }

  return { errors, warnings };
}

/**
 * Main sync function
 */
function syncTaxonomy(validateOnly = false) {
  log('🔄 NTUC Taxonomy Sync Script', colors.blue);
  log('================================\n');

  // Check if master taxonomy exists
  if (!fs.existsSync(MASTER_TAXONOMY_PATH)) {
    log(`❌ Master taxonomy not found at: ${MASTER_TAXONOMY_PATH}`, colors.red);
    process.exit(1);
  }

  // Read master taxonomy
  log('📖 Reading master taxonomy...', colors.yellow);
  const taxonomyContent = fs.readFileSync(MASTER_TAXONOMY_PATH, 'utf8');
  const taxonomy = JSON.parse(taxonomyContent);
  log(`✅ Found ${Object.keys(taxonomy.pillars).length} pillars in taxonomy\n`, colors.green);

  // Extract services
  log('🔍 Extracting services from taxonomy...', colors.yellow);
  const services = extractServicesFromTaxonomy(taxonomy);
  log(`✅ Extracted ${services.length} services\n`, colors.green);

  // Validate services
  log('🔍 Validating service data...', colors.yellow);
  let hasErrors = false;
  let warningCount = 0;

  services.forEach((service, index) => {
    const { errors, warnings } = validateService(service, index);
    
    if (errors.length > 0) {
      hasErrors = true;
      errors.forEach(error => log(`  ❌ ${error}`, colors.red));
    }
    
    if (warnings.length > 0) {
      warningCount += warnings.length;
      warnings.forEach(warning => log(`  ⚠️  ${warning}`, colors.yellow));
    }
  });

  if (hasErrors) {
    log('\n❌ Validation failed with errors', colors.red);
    process.exit(1);
  }

  if (warningCount > 0) {
    log(`\n⚠️  ${warningCount} warnings found`, colors.yellow);
  } else {
    log('✅ All services validated successfully\n', colors.green);
  }

  // If validate only, stop here
  if (validateOnly) {
    log('✅ Validation complete (--validate-only flag set)', colors.green);
    return;
  }

  // Write to services-data.json
  log('💾 Writing to services-data.json...', colors.yellow);
  const servicesData = {
    services: services
  };

  fs.writeFileSync(
    SERVICES_DATA_PATH,
    JSON.stringify(servicesData, null, 2) + '\n',
    'utf8'
  );
  
  log(`✅ Successfully wrote ${services.length} services to services-data.json`, colors.green);

  // Summary
  log('\n📊 Summary', colors.blue);
  log('==========');
  const pillarCounts = {};
  services.forEach(service => {
    pillarCounts[service.pillar] = (pillarCounts[service.pillar] || 0) + 1;
  });
  
  Object.entries(pillarCounts).forEach(([pillar, count]) => {
    log(`  ${pillar}: ${count} services`);
  });

  log('\n✅ Sync completed successfully!', colors.green);
}

// Parse command line arguments
const args = process.argv.slice(2);
const validateOnly = args.includes('--validate-only');

// Run sync
try {
  syncTaxonomy(validateOnly);
} catch (error) {
  log(`\n❌ Error: ${error.message}`, colors.red);
  process.exit(1);
}