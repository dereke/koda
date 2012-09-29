# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib/', __FILE__)
$:.unshift lib unless $:.include?(lib)

require 'bundler/version'

Gem::Specification.new do |s|
  s.name        = "koda"
  s.version     = "0.0.1"
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Marcel du Prez", "Derek Ekins"]
  s.email       = ["marceldupr@gmail.com", "derek@spathi.com"]
  s.homepage    = "http://github.com/KodaCMS/Default"
  s.summary     = "Content Management done right"
  s.description = "KodaCMS is unlike any other CMS you might have come across. It manages your content first, thinking about where it will be used later. Create content in the Back-Office and present it on web page, mobile, tablet, flash, silverlight you name it!"

  s.required_rubygems_version = ">= 1.3.6"

  s.add_dependency 'mongo'
  s.add_dependency 'sinatra'
  s.add_dependency 'rack-methodoverride-with-params'
  s.add_dependency 'sinatra-jsonp'

  s.add_dependency 'bson_ext'
  s.add_dependency 'shared-mime-info'
  s.add_dependency 'dalli'
  s.add_dependency 'rest-client'

  s.add_development_dependency'rspec'
  s.add_development_dependency'minitest'
  s.add_development_dependency'rack-test'
  s.add_development_dependency'test-spec'
  s.add_development_dependency'shotgun'
  s.add_development_dependency'watchr'

  s.files        = Dir.glob("{public/**/*,lib}/**/*")
  #s.executables  = ['bundle']
  s.require_path = 'lib'
end