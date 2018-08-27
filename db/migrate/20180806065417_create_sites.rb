class CreateSites < ActiveRecord::Migration[5.1]
  def change
    create_table :sites do |t|
      t.string :first_name
      t.string :last_name
      t.string :address
      t.float :lat
      t.float :long
      t.string :emails, array: true, default: []
      t.string :phone
      t.text :character_notes
      t.string :cancellation_reason
      t.datetime :cancelled_at

      t.references :customer
      t.references :consultants

      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
