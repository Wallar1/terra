class CreateModuleArrays < ActiveRecord::Migration[5.2]
  def change
    create_table :module_arrays do |t|
      t.string "azimuth"
      t.string "tilt"
      t.string "compass_direction"
      t.string "module_type"
      t.integer "module_count"
      t.integer "ac_annual"
      t.float "losses"
      
      t.references :design

      t.timestamps
    end
  end
end
