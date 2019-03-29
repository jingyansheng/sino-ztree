module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      map: ['dest/**/*.map'],
      css: ['dest/css/**/*.css'],
      js: ['dest/js/**/*.js'],
      images: ['dest/images/*'],
    },
    jshint: {
      options: {
        esversion: 6
      },
      src: ['js/class/**/*.js']
    },
    sass: {
      dist_expanded: {
        options:{
          style: 'expanded'
        },
        files: {
          'dest/css/sino-ztree.css': 'css/sino-ztree.scss'
        }
      },
      dist_compressed: {
        options:{
          style: 'compressed'
        },
        files: {
          'dest/css/sino-ztree.min.css': 'css/sino-ztree.scss'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        src: ['images/*','fonts/*'],
        dest: 'dest/',
      }
    },
    concat: {
      options: {
        //separator: ';',
        banner: '/**\n * Sino Ztree\n *\n * Version: v<%=pkg.version%>\n * Date: <%=grunt.template.today("yyyy-mm-dd")%>\n */\n'
      },
      dist: {
        src: ['js/class/common.js','js/class/garage.js','js/class/creator.js','js/class/public.js','js/class/zTree.js'],
        dest: 'dest/js/<%=pkg.name%>.js'
      }
    },
    uglify: {
      dist: {
        options: {
          mangle: true,
          preserveComments: 'some',
          banner: '/**\n * Sino Ztree\n *\n * Version: v<%=pkg.version%>\n * Date: <%=grunt.template.today("yyyy-mm-dd")%>\n */\n'
        },
        files: {
          'dest/js/<%=pkg.name%>.min.js': ['dest/js/<%=pkg.name%>.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['clean','sass','copy','jshint','concat','uglify']);
  grunt.registerTask('build-css', ['sass','copy']);
  grunt.registerTask('build-js', ['jshint','concat','uglify'])
}
