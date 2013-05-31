'use strict';
module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    
    // Metadata.
    meta: {
      projectName: 'My Super Project Name',
      version: '0.1.0',
      author: 'Benjamin Maugain',
      // JavaScript path
      jsSrcPath: '../assets/js/',
      jsDeployPath: '../public/js/',
      // CSS path
      cssSrcPath: '../assets/scss/',
      cssDeployPath: '../public/css/'
    },
    
    // Banner
    banner: '/*! <%= meta.projectName %> - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'Cyber-Duck Ltd - <%= meta.author %> */\n',
    
    // Tasks configuration.
    
    // Concatenate JS files
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['<%= meta.jsSrcPath %>jquery.js', 
              '<%= meta.jsSrcPath %>alert.js',
              '<%= meta.jsSrcPath %>tooltip.js',
              '<%= meta.jsSrcPath %>popover.js',
              '<%= meta.jsSrcPath %>datepicker.js',
              '<%= meta.jsSrcPath %>tabify.js',
              '<%= meta.jsSrcPath %>jquery.rating.pack.js'
             ],
        dest: '<%= meta.jsDeployPath %>libs.js'
      }
    },
    
    // Minify JS files
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src:  '<%= concat.dist.dest %>',
        dest: '<%= meta.jsDeployPath %>libs.min.js'
      }
    },
    
    // Compass and SCSS
    sass: {
        dist: {
            options: {
                config: 'config.rb',
                force: true
            }
            files: {
                    '<%= meta.cssDeployPath %>main.css': '<%= meta.cssSrcPath %>main.scss'
            }
        }
    },
    
    // image optimization
    imagemin: {
        dist: {
            options: {
                optimizationLevel: 7,
                progressive: true
            },
            files: [{
                expand: true,
                cwd: '../assets/images/',
                src: '**/*',
                dest: '../public/images/'
            }]
        }
    },
    
    // Watch all
    watch: {
            js: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['concat', 'uglify']
            },
            sass: {
                files: ['<%= meta.cssSrcPath %>/*.scss'],
                tasks: ['sass']
            }
        }
        
  });

  // Default task.
  grunt.registerTask('default', ['concat','uglify','sass','imagemin']);
  // Other tasks
  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('js', ['concat','uglify']);
  grunt.registerTask('sass', ['sass']);

};
