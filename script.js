$( document ).ready(function() {
    
    const solve = document.getElementById('solve');
    const clear = document.getElementById('clear');

    var input_id;

    const grid = document.getElementsByClassName('grid-child');

    $('.grid-child').click(function() {
        input_id = document.activeElement.id;
      });

    // var t = '832751..674..9..1..9..827.3...1...4.....45.2.....7.5313....496.4..3...8..61..9374';
    solve.addEventListener("click", function(){
        cari_jawaban(convertStringtoGrid(getinput()));
        tampilkan_jawaban();
    });

    clear.addEventListener("click", function(){
        hapus();
    });
    
    function hapus(){
        for (let i = 0; i < grid.length; i++) {
            grid[i].value = '';
        }
    }
    
    var hasil = [];
    function getinput(){        
        var input_grid = '';
        for(let i = 0; i < grid.length; i++){
            var nilai = grid[i].value;
            if(nilai == ''){
                nilai = '.';
            }
            input_grid += ''+nilai;
        }
        console.log(input_grid);
        return input_grid;
    }

    function convertStringtoGrid(input){
        var inputConvert = input.replaceAll('.',0);
        var array1 = inputConvert.split('');        
        while(array1[0]){
            hasil.push(array1.splice(0,9));
        }
    
        for (var i in hasil) {
            for(var j in hasil[0]){
                hasil[i][j] = +hasil[i][j];
            }
        }

        return hasil;
    }

    var count = 0;
    function cari_jawaban(matrik){
        count++;
        cari = cari_kotak_kosong(matrik);
        var row , col;
        if(!cari){            
            return true;
        }else{
            row = cari[0];
            col = cari[1];
        }
        
        for(let i = 1; i < 10; i++){
            if(cek_valid(matrik,i,[row,col])){ 
                matrik[row][col] = i;
                if(cari_jawaban(matrik)){                    
                    return true;
                }else{
                    matrik[row][col] = 0;
                }
            }
        }
        return false;
    }

    
    function cek_valid(matrik, nomor, posisi){
        // row
        for (let i = 0; i < matrik[0].length; i++) {
            if(matrik[posisi[0]][i] == nomor && posisi[1] != i){
                return false;
            }            
        }

        // column
        for (let i = 0; i < matrik.length; i++) {
            if(matrik[i][posisi[1]] == nomor && posisi[0] != 1){
                return false;
            }            
        }

        boxX = Math.floor(posisi[1]/3);
        boxY = Math.floor(posisi[0]/3);

        for(let i = (boxY*3); i < ((boxY*3)+3); i++){
            for(let j = (boxX*3); j < ((boxX*3)+3); j++){
                if(matrik[i][j]==nomor && {i,j} != posisi){
                    return false;
                }
            }    
        }
        
        return true;
    }

    function cari_kotak_kosong(matrik){
        for(let i = 0; i < matrik.length; i++){
            for (let j = 0; j < matrik[0].length; j++) {
                if(matrik[i][j]==0){                    
                    return [i,j]; // row, col
                }
            }
        }
        return false;
    }

    function tampilkan_jawaban(){
        var sequence = hasil.toString().replace(/,/g, '');
        console.log(sequence);
        console.log('Jumlah Proses ='+count);
        for(let i = 0; i < sequence.length; i++){
                var nilai = sequence[i];
                if(nilai == '.'){
                    grid[i].value = '';    
                }else{            
                    grid[i].value = nilai;    
                    grid[i].disabled = true;
                }
        }
    }
});
