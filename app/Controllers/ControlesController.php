<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class ControlesController extends BaseController
{
    public function index()
    {
        return view('parametrizacion/controles');
    }
}
