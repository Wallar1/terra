module ApplicationHelper
  require 'chronic'

  # formats a string date to another string date
  def format_date(date)
    begin
      Chronic.parse(date).strftime('%m/%d/%y %I:%M %p')
    rescue
      'invalid date'
    end
  end
end
