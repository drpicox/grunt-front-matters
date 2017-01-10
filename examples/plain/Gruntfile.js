/** Gruntfile.js */
module.exports = function(grunt) {

  // Project tasks configurations
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // (C) Tasks configurations here
    frontmatter: {
      example: {
        files: {
          'posts.json': [ 'posts/*.md' ]
        }
      },
    }
  });

  // (L) Load here grunt plugins with tasks
  grunt.loadNpmTasks('grunt-frontmatter');

  // (T) Add here your task(s) 
  grunt.registerTask('default', ['frontmatter']);
};