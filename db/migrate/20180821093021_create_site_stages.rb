class CreateSiteStages < ActiveRecord::Migration[5.2]
  def change
    create_table :site_stages do |t|
      t.references :site
      t.references :stage
    end
  end
end
