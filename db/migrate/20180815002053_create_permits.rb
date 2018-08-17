class CreatePermits < ActiveRecord::Migration[5.2]
  def change
    create_table :permits do |t|

      t.timestamps
    end
  end
end
