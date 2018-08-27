class Design < ApplicationRecord
  belongs_to :site
  has_many :proposals
  has_many :module_arrays
  has_many :inverters
end
