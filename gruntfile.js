// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    'dart-sass': { // Begin Sass Plugin
      dist: {
        options: {
          // outputStyle: 'compressed',
          // sourcemap: false
        },
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['**/*.scss'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },
    postcss: { // Begin Post CSS Plugin
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/app.css'
      }
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },
    uglify: { // Begin JS Uglify Plugin
      options: {
        mangle: false
      },
      js: {
        files: [{
          expand: true,
          cwd: "src/",
          src: ["*.js", "!*.min.js"],
          dest: "js/",
          ext: ".min.js"
        }]
      }
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: 'src/sass/**/*.scss',
        tasks: ['dart-sass', 'postcss', 'cssmin']
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['uglify']
      }
    }
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Grunt tasks
  grunt.registerTask('default', ['watch']);
};