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
            'assets/js/angular.min.js',
            'assets/js/angular-route.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
          ],
          'assets/js/app.js': [
            'app/app.module.js',
            'app/app.routes.js',
            'app/components/*/*.js'
          ],
          'assets/js/shared.js': [
            'app/components/shared/**/*.js'
          ]
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'assets/css/app.css': [
            'bower_components/fontawesome/css/font-awesome.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/bootstrap/dist/css/bootstrap.theme.min.css',
            'assets/css/main.css'
          ]
        }
      }
    },
    watch: {
      css: {
        files: [
          'assets/css/main.css'
        ],
        tasks: ['cssmin']
      },
      script: {
        files: [
          'app/app.module.js',
          'app/app.routes.js',
          'app/components/**/*.js'
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
          style: 'compressed'
        },
        files: {
          'assets/css/quest.fy.css': 'assets/scss/quest.fy.scss'
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