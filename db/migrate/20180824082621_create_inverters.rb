class CreateInverters < ActiveRecord::Migration[5.2]
  def change
    create_table :inverters do |t|
      t.string "model_number"
      t.string "wattage"
      t.string "count"

      t.references :design

      t.timestamps
    end
  end
end
