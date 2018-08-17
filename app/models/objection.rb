class Objection < ApplicationRecord
  has_many :objection_sites
  has_many :sites, through: :objection_sites
end
