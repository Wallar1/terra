class CreateHoas < ActiveRecord::Migration[5.2]
  def change
    create_table :hoas do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :notes

      t.references :site
      t.timestamps
    end
  end
end
