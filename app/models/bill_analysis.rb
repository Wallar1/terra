class BillAnalysis < ApplicationRecord
  belongs_to :site

  validates :status, presence: true
end
