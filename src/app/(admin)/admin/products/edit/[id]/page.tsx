import UpdateProductPage from '@/components/modules/admin/UpdateProductPage';
import React from 'react';

const UpdateProduct = async({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div>
            <UpdateProductPage id={id} />
        </div>
    );
};

export default UpdateProduct;