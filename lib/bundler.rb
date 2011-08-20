require 'fileutils'

require 'rubygems'
require 'closure-compiler'
require 'fewer'
require 'grit'

include Grit

class Bundler
  DIST_DIR = File.expand_path('../../dist', __FILE__)
  SRC_DIR = File.expand_path('../../javascripts', __FILE__)
  REPO = Repo.new('./')
  class << self
    def bundle!
      FileUtils.mkdir_p(DIST_DIR)

      write "#{DIST_DIR}/prod.js" do
        Fewer::Engines::Js.new(SRC_DIR, files).read
      end

      write "#{DIST_DIR}/prod.min.js" do
        Fewer::Engines::Js.new(SRC_DIR, files, :min => true).read
      end
    end

    def bundled
      Fewer::Engines::Js.new(SRC_DIR, files).read
    end

    private
      def files
        @files ||= %w(
          vendor/jquery.js
          vendor/augment.js
          vendor/supplement.js
          lib/jquery.range.js
          models/colour.js
          views/colour_picker_view.js
          views/colour_preview_view.js
          views/hex_control_view.js
          views/hsl_control_view.js
          views/rgb_control_view.js
          app.js
        )
      end

      def header
        @header ||= File.read(File.join(SRC_DIR, 'header.js'))
      end

      def version
        @version ||= REPO.commits.first.id
      end

      def write(path, &block)
        puts "Generating #{path}"

        File.open(path, 'w') do |f|
          f.write header.gsub('@VERSION', version)
          f.write yield.gsub('@VERSION', version)
        end
      end
  end
end
