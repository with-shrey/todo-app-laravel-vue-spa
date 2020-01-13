export function formErrorConvertor(error, fields = []) {
    const obj = {};
    if (error.response && error.response.status === 422) {
        const response = error.response.data;
        obj.message = response.message;
        fields.forEach(field => {
            obj[field] = response.errors[field].join(',')
        });
    } else if (error.response && error.response.data) {
        const response = error.response.data;
        obj.message = response.message;
        fields.forEach(field => {
            obj[field] = ''
        });
    } else {
        obj.message = error.message;
        fields.forEach(field => {
            obj[field] = ''
        });
    }
    return obj;
}
