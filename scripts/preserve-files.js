#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files that should never be removed
const PRESERVE_FILES = [
  'public/manifest.json',
  'public/favicon.ico',
  'public/apple-touch-icon.png',
  'public/Evan_Maus_Resume.pdf',
  'public/icon-192x192.png',
  'public/icon-512x512.png'
];

// Backup directory
const BACKUP_DIR = 'backup-files';

function backupFiles() {
  console.log('🔄 Backing up important files...');
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  PRESERVE_FILES.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const fileName = path.basename(filePath);
      const backupPath = path.join(BACKUP_DIR, fileName);
      fs.copyFileSync(filePath, backupPath);
      console.log(`✅ Backed up: ${fileName}`);
    }
  });
}

function restoreFiles() {
  console.log('🔄 Restoring important files...');
  
  PRESERVE_FILES.forEach(filePath => {
    const fileName = path.basename(filePath);
    const backupPath = path.join(BACKUP_DIR, fileName);
    
    if (fs.existsSync(backupPath)) {
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.copyFileSync(backupPath, filePath);
      console.log(`✅ Restored: ${fileName}`);
    }
  });
}

// Run based on command line argument
const command = process.argv[2];

if (command === 'backup') {
  backupFiles();
} else if (command === 'restore') {
  restoreFiles();
} else {
  console.log('Usage: node scripts/preserve-files.js [backup|restore]');
  process.exit(1);
}
