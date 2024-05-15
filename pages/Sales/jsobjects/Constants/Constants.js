export default {
	OpportunityQueryFields: [
		"id", "name", "account_id", "owner_id", "last_activity_date", "stage_name", "amount", "forecast_category", "product_dependency_c", "product_dependency_detail_c", "product_dependency_priority_c", "regular_users_c",
		"next_step", "type", "lead_source", "close_date", "probability", "arr_c",
		"mrr_c", "loss_reason_c", "loss_reason_detail_c", "closed_won_details_c", "use_case_c", "created_date", "sales_engineer_c"],
	AccountQueryFields: ["id", "name", "description", "website", "number_of_employees", "industry", "billing_country", "stripe_id_c", "customer_segmentation_c"],
	UserQueryFields: ["id", "username", "first_name", "last_name", "email",  "time_zone_sid_key"],
	ContactQueryFields: ["account_id", "id", "name", "title", "email"]
}