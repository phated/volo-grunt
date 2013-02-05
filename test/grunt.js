/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: ['<config:lint.files>', 'index.html', 'gameStyles.css', 'dojoConfig.js'],
      tasks: 'lint reload'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        define: true,
        require: true,
        console: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint server watch');

};
