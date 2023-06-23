function generateBlocks() {
  document.getElementById('table').style.removeProperty('display');
  var blockInput = document.getElementById('block-input').value;
  var blockArrays = blockInput.split(',');
  var maxRows = Math.max(...blockArrays);
  var minRows = Math.min(...blockArrays);
  var minValue = Math.min(...blockArrays);
  var minIndex = blockArrays.indexOf(minValue.toString());

  var tableHeader = document.getElementById('tableHeader');
  var tableBody = document.getElementById('tableBody');

  
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  
  for (var i = 1; i <= blockArrays.length; i++) {
    var headerCell = document.createElement('th');
    headerCell.textContent = 'Block ' + i;
    tableHeader.appendChild(headerCell);
  }

  
  for (var i = 1; i <= maxRows; i++) {
    var row = document.createElement('tr');
    for (var j = 0; j < blockArrays.length; j++) {
      var blockCount = parseInt(blockArrays[j].trim());

      var cell = document.createElement('td');
      if( minRows === blockCount){
        if (maxRows - i < blockCount) {
        cell.setAttribute("style", "background-color:green;");
        }
      }
      else if (maxRows - i < blockCount) {
        cell.setAttribute("style", "background-color:gray;");
      }
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }

  //1st frog going left
  var rows = tableBody.getElementsByTagName('tr');
  var frog_col = blockArrays.indexOf(minValue.toString()) - 1;
  var frog_row = blockArrays[frog_col];
  var next_frog_col = frog_col-1;
  var next_frog_row = blockArrays[next_frog_col];

  //2nd frog going right
  var r_frog_col = blockArrays.indexOf(minValue.toString()) + 1;
  var r_frog_row = blockArrays[r_frog_col];
  var next_r_frog_col = r_frog_col+1;
  var next_r_frog_row = blockArrays[next_r_frog_col];

  var rows = tableBody.getElementsByTagName('tr');

  //row color filler
  BlockColor();


  if(frog_col>=0){
    do
    {
      
      //row color filler - left
      Jump(next_frog_row,next_frog_col);
      frog_col = frog_col-1;
      next_frog_col = frog_col - 1;
      frog_row = blockArrays[frog_col];
      next_frog_row = blockArrays[next_frog_col];
    }while(frog_row <= next_frog_row)
  }

  var rows = tableBody.getElementsByTagName('tr');
  
  if(r_frog_col < blockArrays.length){
    do
    {
      //row color filler - right
      R_Jump(next_r_frog_row,next_r_frog_col);
      r_frog_col = r_frog_col+1;
      next_r_frog_col = r_frog_col + 1;
      r_frog_row = blockArrays[r_frog_col];
      next_r_frog_row = blockArrays[next_r_frog_col];
    }while(r_frog_row <= next_r_frog_row)
  }

  if(frog_col<0)
  {
    frog_col = 0;
  }
  if(r_frog_col>=blockArrays.length)
  {
    r_frog_col = blockArrays.length-1;
  }
  document.getElementById('left_frog').textContent = 'The Location of First Frog is : Block'+(frog_col+1);
  document.getElementById('right_frog').textContent = 'The Location of Second Frog is : Block'+(r_frog_col+1);

  var distance = 0;
  do{
    distance++;
    frog_col++;
  }while(frog_col <= r_frog_col)

  
  document.getElementById('distance_frog').textContent = 'Their Distance is : ' + distance + " Blocks";


  function Jump(cur_row,cur_col)
    {

      //left row color fill
      var i = 0;
      var x = cur_row;
      var y = maxRows-1;
      do{
        var cells = rows[y].getElementsByTagName('td');
        cells[cur_col].style.backgroundColor = 'yellow';
        i++;
        y--;
      }while(i != x);

    }

    function R_Jump(r_cur_row,r_cur_col)
    {
      //right row color fill
      var i = 0;
      var x = r_cur_row;
      var y = maxRows-1;
      do{
        var cells = rows[y].getElementsByTagName('td');
        cells[r_cur_col].style.backgroundColor = 'red';
        i++;
        y--;
      }while(i != x);

    }

    function BlockColor()
    {
      if(frog_col>=0){
        //left row color fill
        var i = 0;
        var x = frog_row;
        var y = maxRows-1;
        do{
          var cells = rows[y].getElementsByTagName('td');
          cells[frog_col].style.backgroundColor = 'yellow';
          i++;
          y--;
        }while(i != x);
      }

      if(r_frog_col < blockArrays.length){
        //right row color fill
        var i = 0;
        var x = r_frog_row;
        var y = maxRows-1;
        do{
          var cells = rows[y].getElementsByTagName('td');
          cells[r_frog_col].style.backgroundColor = 'red';
          i++;
          y--;
        }while(i != x);
      }
    }

    
}

