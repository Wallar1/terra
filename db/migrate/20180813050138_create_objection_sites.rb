class CreateObjectionSites < ActiveRecord::Migration[5.2]
  def change
    create_table :objection_sites do |t|
      t.references :site
      t.references :objection

      t.timestamps
    end
  end
end
