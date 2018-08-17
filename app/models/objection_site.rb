class ObjectionSite < ApplicationRecord
  has_many :sites
  has_many :objections
end
