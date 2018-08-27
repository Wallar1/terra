class Search
  include ActiveModel::Model

  attr_accessor :first_name, :last_name, :email, :address, :stage_ids

  def self.find_sites(params)
    query = []
    params.each_pair do |key,val|
      case key
      when 'stage_ids'
        val = val.reject{|i| i.blank?}
        query << "stages.id IN (#{val.join(',')})" if val.present?
      else
        query << "sites.#{key} ~* '#{val}'" if val.present?
      end
    end
    Site.joins(:stages).where(query.join(" AND "))
  end
end