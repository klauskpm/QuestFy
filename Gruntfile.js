module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        compress: true,
        mangle: false
      },
      my_target: {
        files: {
          'assets/js/assets.js': [
            'bower_components/angular/angular.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'assets/js/angular-route.min.js',
            'assets/js/angular-touch.min.js',
          ],
          'assets/js/app.js': [
            'app/app.module.js',
            'app/app.routes.js',
            'app/components/*/*.js',
          ],
          'assets/js/shared.js': [
            'app/components/shared/**/*.js',
          ]
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'assets/css/app.css': [
            'bower_components/fontawesome/css/font-awesome.css',
            'assets/css/quest.fy.css',
            'bower_components/angular-material/angular-material.min.css',
          ]
        }
      }
    },
    watch: {
      css: {
        files: [
          'assets/css/quest.fy.css',
        ],
        tasks: ['cssmin']
      },
      script: {
        files: [
          'app/app.module.js',
          'app/app.routes.js',
          'app/components/**/*.js',
          'app/components/*/*.js',
        ],
        tasks: ['uglify']
      },
      sass: {
        files: ['assets/scss/*.scss'],
        tasks: ['sass']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
        },
        files: {
          'assets/css/quest.fy.css': 'assets/scss/quest.fy.scss',
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin', 'sass', 'watch']);
  // grunt.registerTask('default', 'Grunt running', function() {
  //   grunt.log.write('Grunt is running.').ok();
  // });
};