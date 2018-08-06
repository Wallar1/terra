class CreateDesigns < ActiveRecord::Migration[5.1]
  def change
    create_table :designs do |t|
      t.datetime :start_at
      t.datetime :end_at
      t.datetime :qa_completed_at
      t.string :request_notes
      t.integer :request_size
      t.string :notes
      t.string :design_type
      t.string :status
      t.float :offset
      t.boolean :is_contract

      t.references :site
      t.references :designer
      t.references :qa

      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
