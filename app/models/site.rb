class Site < ApplicationRecord
  include StateManager
  has_one :bill_analysis
  has_many :designs
  has_one :final_contract
  has_many :plan_sets
  has_one :permit
  has_one :financing
  has_one :install
  has_one :post_install
  has_one :hoa

  has_many :users
  has_many :messages
  has_many :site_stages
  has_many :stages, through: :site_stages

  # has_and_belongs_to_many :reasons_to_email

  attr_accessor :stage_change


  before_save do
    clean_emails
    initial_stage
    move_to_next_stage?
  end
  
  def full_name
    begin
      first_name + ' ' + last_name
    rescue
      'no name'
    end
  end

  def clean_emails
    self.emails = self.emails.select{|e| e.present?}.uniq
  end


  def current_stage_names
    stages.pluck(:name).uniq.map{|n| n.titleize + ' Stage'}.join(', ')
  end

  def next_stages
    stages = []
    stage_history.last.each do |s|
      s['children'].each do |c|
        stages << c.titleize + ' Stage'
      end 
    end
    return stages.uniq.join(', ')
  end


  def self.all_sites_with_pos
    @sites = {}
    Site.all.each do |site|
      next if site.lat.blank? || site.lng.blank?
      @sites[site.id] = {
          lat: site.lat, 
          lng: site.lng,
          #infowindowcontent: ApplicationController.render('maps/_infowindow', locals: {:@site => site}, layout: false).gsub(/\n/,''),
          id: site.id,
          icon_url: site.icon_url.present? ? site.icon_url : 'house_question.png',
          first_name: site.first_name || '',
          last_name: site.last_name || '',
          address: site.address || '',
          email: site.emails || [],
          phone: site.phone || '',
          notes: site.notes || '',
      }
    end
    @sites
  end
end
