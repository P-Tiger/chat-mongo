import moment from 'moment';
const dateNow = () => {
	return moment().format("YYYY-MM-DD HH:mm:ss")
}

function renderErr(where, res, status, field, type, check_type) {
	res.status(status);
	if (status == 401) {
		res.send([{
			type: where,
			message: "Authorization",
			code: "Authorization",
			field: field
		}])
	}
	if (status == 404) {
		res.send([{
			type: where,
			message: "Not Found",
			code: "Not Found",
			field: field
		}])
	}
	if (status == 409) {
		res.send([{
			type: where,
			message: "Duplicated",
			code: "Conflict",
			field: field,
			data: type
		}])
	}
	if (status == 403) {
		res.send([{
			type: where,
			message: field || "Permission",
			code: "Permission",
		}])
	}
	if (status == 500) {
		res.send([{
			type: where,
			message: "Internal Server Error",
			code: "Internal",
			field: field
		}])
	}
	if (status == 400) {
		let code = "invalid";
		let message = "shoud be a :" + check_type;
		let field_sent = field
		if (type == 2) {
			code = "missing_field";
			message = "required";
			field = field_sent
		}
		res.send([{
			type: where,
			message: message,
			code: code || '',
			field: field_sent,
		}])
	}
	return res;
};

function renderlogInfo(action, table_user, user, column, old_data, new_data, type, reason_type, reason) {
	let data = {
		action: action,
		created_at: dateNow(),
		table_user: table_user,
		user_type: user && user.type ? user.type : 0,
		info_user: {
			id: user && user.id ? user.id : 0,
			name: user && user.name ? user.name : "",
			email: user && user.email ? user.email : "",
			phone: user && user.phone ? user.phone : "",
			user_name: user && user.user_name ? user.user_name : "",
		},
		info_update: {
			column: column || "",
			old_data: old_data || "",
			new_data: new_data || "",
			type: type || ""
		}
	}
	if (reason_type) {
		data.reason_type = reason_type
	}
	if (reason) {
		data.reason = reason
	}
	return data;
};

export {
	renderErr,
	renderlogInfo,
};
