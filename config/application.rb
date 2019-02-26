require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Testwebpack
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    #allowing the use of the fonts folder inside assets
    config.assets.paths << Rails.root.join("app", "assets", "fonts")

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end


#Official Process for precompiling:

#First clobber: rails assets:clobber
#then precompile: rails assets:precompile
#Delete the yarn.lock file
#then stage those changes
#Delete node modules folder
#then npm install
#It will make a new manifest for some reason, so delete these new changes
#and commit! :)