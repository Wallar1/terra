module ApplicationHelper
  require 'chronic'
  def format_date(date)
    Chronic.parse(date)
  end
end
