class CreateStagesStages < ActiveRecord::Migration[5.2]
  def change
    create_table :stages_stages do |t|
      t.belongs_to :parent
      t.belongs_to :child
    end
  end
end
