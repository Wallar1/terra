# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_07_080505) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bill_analyses", force: :cascade do |t|
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "status"
    t.string "current_price_kwh"
    t.string "optimal_system_size"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_bill_analyses_on_deleted_at"
  end

  create_table "designs", force: :cascade do |t|
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "qa_completed_at"
    t.string "request_notes"
    t.integer "request_size"
    t.string "notes"
    t.string "design_type"
    t.string "status"
    t.float "offset"
    t.boolean "is_contract"
    t.bigint "site_id"
    t.bigint "designer_id"
    t.bigint "qa_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_designs_on_deleted_at"
    t.index ["designer_id"], name: "index_designs_on_designer_id"
    t.index ["qa_id"], name: "index_designs_on_qa_id"
    t.index ["site_id"], name: "index_designs_on_site_id"
  end

  create_table "final_contracts", force: :cascade do |t|
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "status"
    t.datetime "signed_at"
    t.datetime "greenlit_at"
    t.datetime "credit_approved_at"
    t.datetime "credit_expired_at"
    t.float "price"
    t.text "notes"
    t.bigint "user_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_final_contracts_on_deleted_at"
    t.index ["user_id"], name: "index_final_contracts_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "stage"
    t.text "content"
    t.boolean "is_notifiable"
    t.boolean "is_pinned"
    t.jsonb "changed_values", default: {}
    t.bigint "site_id"
    t.bigint "user_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_messages_on_deleted_at"
    t.index ["site_id"], name: "index_messages_on_site_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "proposals", force: :cascade do |t|
    t.datetime "start_at"
    t.datetime "end_at"
    t.string "status"
    t.string "is_contract"
    t.string "finance_type"
    t.string "discount_level"
    t.bigint "design_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deleted_at"], name: "index_proposals_on_deleted_at"
    t.index ["design_id"], name: "index_proposals_on_design_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "address"
    t.float "lat"
    t.float "long"
    t.string "email"
    t.string "phone"
    t.bigint "customer_id"
    t.bigint "consultant_id"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["consultant_id"], name: "index_sites_on_consultant_id"
    t.index ["customer_id"], name: "index_sites_on_customer_id"
    t.index ["deleted_at"], name: "index_sites_on_deleted_at"
  end

end
