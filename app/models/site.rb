class Site < ApplicationRecord
  has_one :bill_analysis
  has_many :designs
  has_one :final_contract
  has_many :users
  has_many :messages

  has_many :objection_sites
  has_many :objections, through: :objection_sites


  def full_name
    begin
      first_name + ' ' + last_name
    rescue
      'no name'
    end
  end
end
