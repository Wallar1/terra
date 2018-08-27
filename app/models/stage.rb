class Stage < ApplicationRecord
  has_many :site_stages
  has_many :sites, through: :site_stages
  
  # has_many :child_links, class_name: 'StageLink', foreign_key: :parent_id
  # has_many :children, through: :child_links, source: :child
  # has_many :parent_links, class_name: 'StageLink', foreign_key: :child_id
  # has_many :parents, through: :parent_links, source: :parent

  has_and_belongs_to_many :children, class_name: 'Stage', 
     foreign_key: 'parent_id', association_foreign_key: 'child_id'
  has_and_belongs_to_many :parents, class_name: 'Stage', 
     foreign_key: 'child_id', association_foreign_key: 'parent_id'
end
