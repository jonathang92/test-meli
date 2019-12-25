import React from 'react';
import './index.scss';
// este es un pequeño breadcrumbs dinamico, aunque no lo utilicé en el detalle del producto pero, me pareció bueno tenerlo como un componente aparte
function renderFilters(data) {
  if (data.filters.length > 0) {
    let filters = data.filters[0].values[0].path_from_root;
    let breadcrumb = "";
    for (let i = 0; i < filters.length; i++) {
      const element = filters[i];
      if (i > 0) {
        breadcrumb += " > ";
      }
        breadcrumb += element.name;
    }
    return breadcrumb;
  }
  return "";
  
}
function Breadcrumbs(filters) {
  return (
    <div className="breadcrumbs">
      <span>
        {renderFilters(filters)}
      </span>
    </div>
  );
}

export default Breadcrumbs;