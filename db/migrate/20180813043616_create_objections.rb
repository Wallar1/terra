class CreateObjections < ActiveRecord::Migration[5.2]
  def change
    create_table :objections do |t|
      t.string :reason

      t.timestamps
    end
  end
end
