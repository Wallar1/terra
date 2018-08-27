class BillAnalysis < ApplicationRecord
  belongs_to :site

  validates :status, presence: true


  has_many_attached :bill_files
end
