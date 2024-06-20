export function createCvInformation(name, email, phone, address, link, intent, tpye, images, row, part, col, cvIndex, avatarPath) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('link', link);
    formData.append('intent', intent);
    formData.append('type', tpye);
    images && formData.append('images', images);
    formData.append('row', row);
    formData.append('part', part);
    formData.append('col', col);
    formData.append('cvIndex', cvIndex);
    avatarPath && formData.append('avatarPath', avatarPath);
    return formData;
}