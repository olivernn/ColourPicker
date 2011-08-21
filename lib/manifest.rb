require 'fileutils'
require 'rubygems'
require 'grit'

include Grit

class Manifest
  DIST_PATH = File.expand_path('../../dist/cache.manifest', __FILE__)
  SRC_PATH = File.expand_path('../../manifest/cache.manifest', __FILE__)
  REPO = Repo.new('./')

  class << self
    def build!
      puts "Generating #{DIST_PATH}"
      File.open(SRC_PATH, "r") do |r|
        File.open(DIST_PATH, 'w') do |f|
          f.write r.read.gsub('@REVISION', revision)
        end
      end
    end

    private

    def revision
      @revision ||= REPO.commits.first.id
    end
  end
end
