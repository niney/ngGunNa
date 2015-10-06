'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates'//,
        //cdnify: 'grunt-google-cdn'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    // initConfig (S)
    grunt.initConfig({

        yeoman: appConfig,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // ���� ȯ�� ���� // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                //hostname: '172.30.1.55',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath:  /\.\.\//
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles'
                /*'imagemin',
                'svgmin'*/
            ]
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ]
            }
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        // ���� ���� ���� �� Waiting //Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/scripts/common/views/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/scripts_step1/common',
                    src: '*.js',
                    dest: '.tmp/scripts_step1/common'
                }]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*',
                        'scripts/require.js',
                        'scripts/**/views/**'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/scripts_step2',
                    dest: '<%= yeoman.dist %>/scripts',
                    src: ['**/*']
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            vendorStyles: {
                expand: true,
                cwd: '<%= yeoman.app %>/vendor',
                dest: '.tmp/vendor/',
                src: '{,*/}*.css'
            }
        },
        uglify: {
            common: {
                files: {
                    '.tmp/scripts_step2/common/common.js': ['.tmp/scripts_step1/common/common.js']
                    //'.tmp/scripts_step2/common/common.js': ['app/scripts/common/controllers/main.js', 'app/scripts/common/directives/version.js']
                }
            }
        },
        replace: {
            development: {
                options: {
                    patterns: [{
                        json: grunt.file.readJSON('./config/environments/development.json')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['./config/route-config.js'],
                    dest: '<%= yeoman.app %>/scripts/'
                }]
            },
            production: {
                options: {
                    patterns: [{
                        json: grunt.file.readJSON('./config/environments/production.json')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['./config/route-config.js'],
                    dest: '<%= yeoman.app %>/scripts/'
                }]
            }
        },
        // r.js compile config
        requirejs: {
            dist: {
                options: {
                    /*dir: '<%= yeoman.dist %>/scripts/',
                    modules: [{
                        name: 'main'
                    }],
                    preserveLicenseComments: false, // remove all comments
                    removeCombined: true,
                    baseUrl: '.tmp/<%= yeoman.app %>/scripts',
                    mainConfigFile: '.tmp/<%= yeoman.app %>/scripts/main.js',
                    optimize: 'uglify2',
                    uglify2: {
                        mangle: false
                    }*/
                    baseUrl:'./app/scripts',
                    name: "main",
                    out: "./dist/scripts/main.js",
                    mainConfigFile: './app/scripts/main.js'
                }
            }
        }
    });
    // initConfig (E)

    grunt.registerTask('concatPrepareCommon', 'common module concat', function (target) {

        var concat = grunt.config.get('concat') || {};
        var dir = 'app/scripts/common';

        concat[dir] = {
            src: [dir + '/controllers/*.js', dir + '/directives/*.js',
                dir + '/filters/*.js', dir + '/services/*.js'],
            dest: '.tmp/scripts_step1/common/common.js'
        };
        //console.log(concat);
        grunt.config.set('concat', concat);
    });

    grunt.registerTask('concatPrepare', 'module concat', function (target) {

        // get all module directories
        grunt.file.expand("app/scripts/components/*").forEach(function (dir) {

            // get the module name from the directory name
            var dirName = dir.substr(dir.lastIndexOf('/')+1);

            if(dirName.lastIndexOf('.js') != -1)
                return;

            // get the current concat object from initConfig
            var concat = grunt.config.get('concat') || {};

            // create a subtask for each module, find all src files
            // and combine into a single js file per module
            concat[dirName] = {
                src: [dir + '/controllers/*.js', dir + '/directives/*.js',
                    dir + '/filters/*.js', dir + '/services/*.js'],
                dest: '.tmp/scripts_step1/components/' + dirName + '/' + dirName + '.js'
            };

            /*concat['moduleOne'] = {
                src: "app/scripts/components/bbs/package/!**",
                dest: "dev/js/modules/moduleOne.min.js"
            };*/
            //console.log(concat);
            // add module subtasks to the concat task in initConfig
            grunt.config.set('concat', concat);
        });
    });

    grunt.registerTask('uglifyPrepare', 'uglify components prepare', function (target) {

        // get all module directories
        grunt.file.expand("app/scripts/components/*").forEach(function (dir) {
            var dirName = dir.substr(dir.lastIndexOf('/')+1);
            if(dirName.lastIndexOf('.js') != -1)
                return;
            var uglify = grunt.config.get('uglify') || {};

            uglify[dirName] = {};
            uglify[dirName].files = {};
            uglify[dirName].files['.tmp/scripts_step2/components/'+ dirName + '/' + dirName + '.js'] =
                ['.tmp/scripts_step1/components/' + dirName + '/' + dirName + '.js'];
            //console.log(uglify);

            grunt.config.set('uglify', uglify);
        });
    });

    grunt.registerTask('build', [
        'clean:dist',
        'replace:production',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'concatPrepareCommon',
        'concatPrepare',
        'concat',
        'uglifyPrepare',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'copy:dist',
        'usemin',
        'requirejs:dist'
    ]);


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        /*if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }*/

        grunt.task.run([
            'clean:server',
            'replace:development',
            'wiredep',
            'connect:livereload',
            'watch'
        ]);
    });
};