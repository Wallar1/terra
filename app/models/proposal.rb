class Proposal < ApplicationRecord
  belongs_to :design
  has_one :plan_set
end
