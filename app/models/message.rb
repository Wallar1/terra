class Message < ApplicationRecord
  belongs_to :site, optional: true
  belongs_to :user, optional: true

  #after_save :broadcast_partial

  def broadcast_partial
    MessageBroadcastJob.perform_now(self.id)
  end

  def text
    return content unless changed_values.present?

    # Changed_values will be in the form: ['attr_name',['original_value', 'new_value']]
    arr = []
    changed_values.each do |change|
      next if (change[1][0].blank? && change[1][1].blank?) ||
          (change[1][1] == "[\"\", \"\", \"\"]" && change[1][0] == nil) ||
          change[0] == 'updated_at'
      arr << "<strong>#{change.first.split('_').map(&:capitalize).join(' ')}</strong> was
        changed from #{val_or_blank(change[1][0])}
        to #{val_or_blank(change[1][1])}"
    end
    arr.any? ? arr.join('<br>') : 'Record was updated, but no attributes where changed.'
  end

  def val_or_blank(val)
    begin
      # This is needed because the changed_values returns the dates as strings. Ex: "2018-05-29T08:00:00.000Z"
      # I have to do this iso8601 parsing, becuase DateTime.parse(str) with find 'sun' in '[\"sungrade\"]' and 
      # will return the date for the last Sunday... 
      formatted = DateTime.iso8601(val).localtime.strftime('%m/%d/%Y %I:%M %P')
    rescue
      formatted = val
    end
    formatted.present? ? formatted : '{blank}'
  end
end
