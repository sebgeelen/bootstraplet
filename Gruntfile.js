module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    uglify: {
      options: {
        report: 'min',
        banner: 'javascript:(function(){',
        footer: '})();'
      },
      min: {
        files: [{
          expand: true,
          src: '**/*.js',
          dest: 'min/',
          cwd: 'src/',
          ext: '.min.js'
        }]
      }
    },
    replace: {
      index: {
        options: {
          patterns: [
            {
              match: 'IncScr',
              replacement: '<%= grunt.file.read("min/bookmarklet.min.js") %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['src/index.html'], dest: ''}
        ]
      }
    },
    watch: {
      javascript: {
        files: ['./src/*.js'],
        tasks: ['uglify']
      },
      html: {
        files: ['./src/*.html'],
        tasks: ['replace']
      },
    }
  });

  grunt.registerTask('default', ['uglify', 'replace']);
  grunt.registerTask('build', ['uglify']);

};
