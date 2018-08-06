class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.string :stage
      t.text :content
      t.boolean :is_notifiable
      t.boolean :is_pinned
      t.jsonb :changed_values, default: {}

      t.references :site
      t.references :user
      
      t.datetime :deleted_at
      t.index :deleted_at
      t.timestamps
    end
  end
end
