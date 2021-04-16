import parameter from 'parameter';
import {
	includes as _includes,
	forEach as _forEach,
	map as _map,
} from 'lodash';
import moment from 'moment';
// import {
// 	Op,
// } from 'sequelize';
const dateNow = () => {
	return moment().format("YYYY-MM-DD HH:mm:ss")
}

// function paging(filters) {
// 	let options = {};
// 	if (filters.perPage && !isNaN(filters.perPage)) {
// 		options.limit = filters.perPage > 100 ? 100 : filters.perPage * 1;
// 		if (filters.full == "true") {
// 			options.limit = filters.perPage * 1;
// 		}
// 	} else {
// 		options.limit = 20; //default 20 items perPage
// 	}
// 	if (filters.page > 0) {
// 		options.offset = (filters.page - 1) * options.limit;
// 	} else {
// 		options.offset = 0;
// 	}
// 	return options;
// }

const keysCheckPager = {
	page: {
		type: 'int',
		required: false
	},
	perPage: {
		type: 'int',
		required: false
	}
};

function checkPager(req, res, next) {
	let errors = parameter.validate(keysCheckPager, req.body);
	if (errors) {
		return renderErr("");
	}
}

function filterFromToCreated(created_from, created_to, where) {

	if (created_from) {
		let dateFrom = new Date(created_from + ' 00:00:00');
		if (dateFrom != 'Invalid Date') {
			where.created_at = {
				[Op.gte]: dateFrom
			};
		}
	}
	if (created_to) {
		let dateTo = new Date(created_to + ' 23:59:59');
		if (dateTo != 'Invalid Date') {
			where.created_at = {
				[Op.lte]: dateTo
			};
		}
	}
	if (created_from && created_to) {
		let dateFrom = new Date(created_from + ' 00:00:00');
		let dateTo = new Date(created_to + ' 23:59:59');
		if (dateFrom != 'Invalid Date' && dateTo != 'Invalid Date') {
			where.created_at = {
				[Op.between]: [dateFrom, dateTo]
			}
		}
	}
	return where;
}
/**
 * 
 * @param {Xlsx.SHEET} sheet  from xlsx-populate lib
 * @param {Object} header Column->Text 
 * @param {Integer} row To write the header
 */
async function renderExcelHeader(sheet, header, row, color) {
	let fill = "d6d3d3";
	if (color) {
		fill = color
	}
	let css = {
		bold: true,
		border: true,
		fill: fill
	};
	for (let key of Object.keys(header)) {
		sheet.cell(`${key + row}`).value(header[key]).style(css);
	}
}

function renameFillter(objectName, name, rename, listValues) {
	_forEach(listValues, (val, index) => {
		if (index + 1 == objectName[name]) {
			objectName[rename] = val;
			delete objectName[name];
			return;
		}
	})
}

function renameListFillter(objectName, objectRename) {
	_forEach(objectName, (val1, key1) => {
		_forEach(objectRename, (val2, key2) => {
			if (key1 == key2) {
				objectName[val2] = val1;
				delete objectName[key1];
			}
		})
	})
}

function renderErr(where, ctx, status, field, type, check_type) {
	ctx.status = status;
	if (status == 404) {
		ctx.body = [{
			type: where,
			message: "Not Found",
			code: "Not Found",
			field: field
		}]
	}
	if (status == 409) {
		ctx.body = [{
			type: where,
			message: "Duplicated",
			code: "Conflict",
			field: field,
			data: type
		}]
	}
	if (status == 403) {
		ctx.body = [{
			type: where,
			message: field || "Permission",
			code: "Permission",
		}]
	}
	if (status == 500) {
		ctx.body = [{
			type: where,
			message: "Internal Server Error",
			code: "Internal",
			field: field
		}]
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
		ctx.body = [{
			type: where,
			message: message,
			code: code || '',
			field: field_sent,
		}]
	}

	return ctx;
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
	// paging,
	checkPager,
	renderExcelHeader,
	renameFillter,
	renameListFillter,
	filterFromToCreated,
	renderlogInfo,
}