<?php

/* @var $this yii\web\View */

$this->title = 'Страница редактирования';
?>
<script>
    document.getElementsByTagName("html")[0].className += " js";
</script>
<div class="flex@md">
    <aside class="sidebar sidebar--static@md js-sidebar" id="sidebar" aria-labelledby="sidebarTitle">
        <div class="sidebar__panel">
            <header class="sidebar__header">
                <div class="Brand">Color Project</div>
                <button class="reset sidebar__close-btn js-sidebar__close-btn js-tab-focus">
                    <svg class="icon" viewBox="0 0 16 16">
                        <title>Close panel</title>
                        <g stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
                            <line x1="13.5" y1="2.5" x2="2.5" y2="13.5"></line>
                            <line x1="2.5" y1="2.5" x2="13.5" y2="13.5"></line>
                        </g>
                    </svg>
                </button>
            </header>

            <div class="sidebar__content">
                <!-- start sidebar content -->
                <div class="text-component padding-md">
                    <!--         <form class="form-inline md-form mb-0 w-100 form-sm mt-0">
  <i class="fas fa-search" aria-hidden="true"></i>
  <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
    aria-label="Search"> 
</form> -->


                    <div class="search-input search-input--icon-right">
                        <input class="form-control width-100%" type="search" name="searchInputX" id="searchInputX" placeholder="Search...">
                        <button class="search-input__btn">
                            <svg class="icon" viewBox="0 0 24 24">
                                <title>Search</title>
                                <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" stroke="currentColor" fill="none" stroke-miterlimit="10">
                                    <line x1="22" y1="22" x2="15.656" y2="15.656"></line>
                                    <circle cx="10" cy="10" r="8"></circle>
                                </g>
                            </svg>
                        </button>
                    </div>




                    <section>
                        <div class="container m-0 p-0 max-width-sm">

                            <ul class="accordion  js-accordion category-container mb-0" data-animation="on" data-multi-items="off">


                            </ul>

                        </div>
                    </section>





                </div>
                <!-- end sidebar content -->









            </div>
        </div>
    </aside>

    <main class="w-100 position-relative">
        <!-- start main content -->
        <div class="position-absolute fixed-top">

            <div class="border-bottom card w-100">
                <div class="d-flex p-2 card-body justify-content-between ">

                    <div class="text-center flex-column">

                        <button class="button-no-active shadow_none btn btn--primary button-studio" aria-controls="sidebar"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3V14C0.89543 14 0 13.1046 0 12V2C0 0.89543 0.89543 0 2 0H12C13.1046 0 14 0.89543 14 2H3C2.4477 2 2 2.4477 2 3ZM5 17V6C5 5.4477 5.4477 5 6 5H17C17 3.8954 16.1046 3 15 3H5C3.8954 3 3 3.8954 3 5V15C3 16.1046 3.8954 17 5 17ZM8 6H18C19.1046 6 20 6.8954 20 8V18C20 19.1046 19.1046 20 18 20H8C6.8954 20 6 19.1046 6 18V8C6 6.8954 6.8954 6 8 6ZM18 18V8H8V18H18Z" fill="#393939" />
                            </svg></button>
                        <button class="button-no-active shadow_none btn btn--primary button-studio"><svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8887 8L10.89 1.99867L16.8913 8H16.89V18H4.89V8H4.8887ZM2.89001 9.9987L1.4132 11.4755L0 10.0623L9.477 0.585293C10.2574 -0.195098 11.5226 -0.195098 12.303 0.585293L21.78 10.0623L20.3668 11.4755L18.89 9.9987V18C18.89 19.1046 17.9946 20 16.89 20H4.89C3.7854 20 2.89001 19.1046 2.89001 18V9.9987Z" fill="#393939" />
                            </svg></button>
                    </div>

                    <div class="text-center flex-column">

                        <button class="button-no-active shadow_none btn btn--primary button-studio"><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.4144 6.00007H10.0002C17.8691 6.00007 21.0002 9.25637 21.0002 17.0001H19.0002C19.0002 10.3438 16.7466 8.00007 10.0002 8.00007H4.4144L8.7073 12.293L7.293 13.7072L0.585938 7.00007L7.293 0.292969L8.7073 1.70717L4.4144 6.00007Z" fill="#393939" />
                            </svg>
                        </button>
                        <button class="button-no-active shadow_none btn btn--primary button-studio"><svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M16.5858 6.00007L12.2929 1.70717L13.7071 0.292969L20.4142 7.00007L13.7071 13.7072L12.2929 12.293L16.5858 8.00007H11C4.2536 8.00007 2 10.3438 2 17.0001H0C0 9.25637 3.1311 6.00007 11 6.00007H16.5858Z" fill="#393939" />
                            </svg></button>

                        <!--       <div class="def-number-input number-input safari_only">
                                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" class="minus size-tool"></button>
                                <input class="scale" min="0" name="scale" value="100" type="number">
                                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus size-tool"></button>
                            </div> -->


                        <!--  <input class="scale" type="text" placeholder="Scale" value="100"> -->
                    </div>

                    <div class="text-center flex-column">

                        <button class="button-no-active shadow_none btn btn--primary button-studio"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12 4.2874 12.0303 4.5678 12.0879 4.838L7.0169 7.3735C6.2836 6.5319 5.2039 6 4 6C1.79086 6 0 7.7909 0 10C0 12.2091 1.79086 14 4 14C5.2039 14 6.2836 13.4681 7.0169 12.6265L12.0879 15.162C12.0303 15.4322 12 15.7126 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C14.7961 12 13.7164 12.5319 12.9831 13.3735L7.9121 10.838C7.9697 10.5678 8 10.2874 8 10C8 9.7126 7.9697 9.4322 7.9121 9.162L12.9831 6.6265C13.7164 7.4681 14.7961 8 16 8C18.2091 8 20 6.2091 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4ZM6 10C6 11.1046 5.1046 12 4 12C2.8954 12 2 11.1046 2 10C2 8.8954 2.8954 8 4 8C5.1046 8 6 8.8954 6 10ZM16 6C17.1046 6 18 5.1046 18 4C18 2.8954 17.1046 2 16 2C14.8954 2 14 2.8954 14 4C14 5.1046 14.8954 6 16 6ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16Z" fill="#393939" />
                            </svg></button>


                        <button class="button-no-active shadow_none save btn btn--primary button-studio save-button" type="button" id="dropdownMenuMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2929 7.2929L11 10.5858V0H9V10.5858L5.7071 7.2929L4.2929 8.7071L10 14.4142L15.7071 8.7071L14.2929 7.2929ZM20 18V14H18V18H2V14H0V18C0 19.1046 0.89543 20 2 20H18C19.1046 20 20 19.1046 20 18Z" fill="#393939" />
                            </svg>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuMenu">
                            <button class="dropdown-item format-save-item" value="png" type="button">PNG</button>
                            <button class="dropdown-item format-save-item" value="jpeg" type="button">JPEG</button>
                            <button class="dropdown-item format-save-item" value="pdf" type="button">PDF</button>
                        </div>


                        <!--
                            <button class="save btn btn--primary button-studio save-button"><img src="img/15.svg"></button>

-->
                    </div>


                </div>
            </div>
            <div class="w-100">
                <div class="d-flex card-body justify-content-center ">

                    <div class="plus_btn def-number-input number-input safari_only">
                        <button class="minus plus_btn size-tool size-tool-button"></button>
                        <input class="scale" min="0" name="scale" value="100" type="number">
                        <button class="plus plus_btn size-tool size-tool-button"></button>
                    </div>
                </div>

            </div>
        </div>


        <div class="container h-100">

            <div class="row over justify-content-center h-100">
                <div class="align-self-center main-svg unselectable">


                </div>





                <!--    <div class="container h-100">

                <div class="row h-100">
                    <div class="align-self-center main-svg">

                    </div>
                
                </div>
            </div> -->
                <div class="position-absolute fixed-bottom">



                    <!--    <div class="m-5 def-number-input number-input safari_only">
                                <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" class="minus size-tool"></button>
                                <input class="scale quantity" min="0" name="quantity" value="100" type="number">
                                <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus size-tool"></button>
                            </div>-->

                    <!-- default panel -->
                    <div class="card w-100 a border-0 b tools-panel tools-panel-default border-top">
                        <div class="d-flex card-body index justify-content-around">
                            <p class="m-0 label_color">Выберите элемент</p>
                        </div>
                    </div>

                    <!-- text panel -->
                    <div style="display: none;" class="card w-100 a border-0 b tools-panel tools-panel-text">
                        <div class="d-flex card-body index justify-content-around c" data-tools="defalt">

                            <!-- Container -->
                            <div class="flex flex-column items-start tool-item font-tool">
                                <button class="shadow_none btn_main fonts btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Шрифт
                                </button>
                            </div>

                            <!-- Container -->
                            <div class="text-center flex-column tool-item color-tool">
                                <button class=" btn color-picker button-studio btn--primary m"></button>
                            </div>

                            <!-- Container -->
                            <div class="text-center flex-column tool-item size-tool">
                                <!-- <p class="m-0 label_color">Размер</p> -->
                                <div class="def-number-input number-input safari_only">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()" class="minus size-tool"></button>
                                    <input class="quantity" min="0" name="quantity" value="1" type="number">
                                    <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()" class="plus size-tool"></button>
                                </div>
                            </div>

                            <!-- Container -->
                            <div class="text-center flex-column tool-item style-tool">
                                <!--    <p class="m-0 label_color">Стиль</p> -->
                                <button id="underline" class="button-no-active shadow_none btn btn--primary button-studio">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="24 / basic / text-underline">
                                            <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M19 2H17V11C17 14.3137 15.3137 16 12 16C8.68629 16 7 14.3137 7 11V2H5V11C5 15.4183 7.58172 18 12 18C16.4183 18 19 15.4183 19 11V2ZM4 20V22H20V20H4Z" fill="#393939" />
                                        </g>
                                    </svg>
                                </button>
                                <button id="weight" class="button-no-active btn shadow_none btn--primary button-studio text-style">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4297 11.348C18.5154 12.1296 20 14.1414 20 16.5C20 19.5376 17.5376 22 14.5 22H6V2H12.5C15.5376 2 18 4.46243 18 7.5C18 8.99801 17.4011 10.3562 16.4297 11.348ZM12.5 11C14.433 11 16 9.433 16 7.5C16 5.567 14.433 4 12.5 4H8V11H12.5ZM8 20V13H14.5C16.433 13 18 14.567 18 16.5C18 18.433 16.433 20 14.5 20H8Z" fill="#393939" />
                                </svg>
                                </button>
                                <button id="style" class="button-no-active btn shadow_none btn--primary button-studio text-style">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.8022 4L11.2466 20H15V22H5.5V20H9.19783L12.7534 4H9.5V2H19V4H14.8022Z" fill="#393939" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Container -->
                            <div class="text-center flex-column tool-item file-tool">
                                <fieldset class="file-upload">
                                    <label for="upload1" class="btn_main shadow_none file-upload__label btn btn--subtle h-36">
                                        <span class="file-upload__text file-upload__text--has-max-width">Upload a file</span>
                                    </label>
                                    <input type="file" class="file-upload__input" name="upload1" id="upload1">
                                </fieldset>
                            </div>

                            <!-- Container -->
                            <div class="text-center flex-column tool-item delete-tool">
                                <button id="style" class="delete-button button-no-active btn shadow_none btn--primary button-studio text-style">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1H15C16.1046 1 17 1.89543 17 3V4H20C21.1046 4 22 4.89543 22 6V8C22 9.10457 21.1046 10 20 10H19.9199L19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5.00345 21.083L4.07987 10H4C2.89543 10 2 9.10457 2 8V6C2 4.89543 2.89543 4 4 4H7V3C7 1.89543 7.89543 1 9 1ZM4 6H7H17H20V8H4V6ZM6.08649 10H17.9132L17.0035 20.917L17 21H7L6.08649 10ZM15 3V4H9V3H15ZM13.4142 15L15.7071 17.2929L14.2929 18.7071L12 16.4142L9.70711 18.7071L8.29289 17.2929L10.5858 15L8.29289 12.7071L9.70711 11.2929L12 13.5858L14.2929 11.2929L15.7071 12.7071L13.4142 15Z" fill="#393939" fill-opacity="0.9" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>


                    <div class="font-container item-start collapse" id="collapseExample">

                        <form>

                            <div class="p-4 shadow_none card">
                                <div class="search-input search-input--icon-right ">
                                    <input class="form-control width-100%" type="search" name="searchInputX" id="searchInputX" placeholder="Search...">
                                    <button class="search-input__btn">
                                        <svg class="icon" viewBox="0 0 24 24">
                                            <title>Search</title>
                                            <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" stroke="currentColor" fill="none" stroke-miterlimit="10">
                                                <line x1="22" y1="22" x2="15.656" y2="15.656"></line>
                                                <circle cx="10" cy="10" r="8"></circle>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>


                            <div class="shadow_none block-font p-4 card">
                                <fieldset>


                                    <!--     <ul class="fonts-list radio-list flex flex-column flex-gap-xxxs">
                                        <li>
                                            <input data-src="uploads/fonts/comfortaa/Comfortaa[wght].ttf" class="fonts-item radio" type="radio" name="radioButton" id="radio1" checked>
                                            <label for="radio1">Comfortaa</label>
                                        </li>
                                    </ul>-->

                                    <div class="list-group">

                                    </div>
                                </fieldset>
                            </div>
                        </form>

                    </div>




                    <!--  <div class="format-container collapse" id="collapseExample1">

                    <form>
                        <div class=" p-4 card">
                            <fieldset>
                                <legend class="form-legend">Выберете формат</legend>

                                <ul class="radio-list flex flex-column flex-gap-xxxs format-save">
                                    <li>
                                        <input class="format-save-item radio" type="radio" name="radioButton" id="radio12" value="png" checked>
                                        <label for="radio12">PNG</label>
                                    </li>

                                    <li>
                                        <input class="format-save-item radio" type="radio" name="radioButton" id="radio13" value="jpeg">
                                        <label for="radio13">JPEG</label>
                                    </li>

                                    <li>
                                        <input class="format-save-item radio" type="radio" name="radioButton" id="radio14" value="pdf">
                                        <label for="radio14">PDF</label>
                                    </li>
                                </ul>
                            </fieldset>
                        </div>
                    </form>

                </div>-->
                </div>

                <!-- end main content -->
    </main>
</div>