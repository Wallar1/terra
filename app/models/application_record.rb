class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  after_save :record_change


  def record_change
    return if self.is_a? Message
    message = Message.create!({
      user_id: User.current_id || User.find_by_email('automatic_audit@terra.com').id,
      site_id: self.respond_to?('site') ? self.site_id : nil,
      changed_values: self.saved_changes
    })
  end
end